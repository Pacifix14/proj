# Create a CloudWatch log group for the ECS service
resource "aws_cloudwatch_log_group" "log_group" {
  name              = local.cloudwatch_log_group_name
  retention_in_days = 14

  tags = merge(local.common_tags, {
    Name = "${local.name_prefix}-log-group"
  })
}

# Create a metric filter to detect unexpected errors in the logs
# This will search for the "isUnexpectedError" field set to true in the log events
resource "aws_cloudwatch_log_metric_filter" "error_filter" {
  name           = "${local.name_prefix}-unexpected-error-filter"
  log_group_name = aws_cloudwatch_log_group.log_group.name
  pattern        = "{ $.isUnexpectedError IS true }"

  metric_transformation {
    name      = "ErrorCount"
    namespace = "LogMetrics"
    value     = "1"
  }
}

# Create a CloudWatch alarm based on the unexpected error metric
resource "aws_cloudwatch_metric_alarm" "error_alarm" {
  alarm_name          = "${local.name_prefix}-unexpected-error-alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 1
  metric_name         = "ErrorCount"
  namespace           = "LogMetrics"
  period              = 60
  statistic           = "Sum"
  threshold           = 1
  alarm_description   = "Alarm when unexpected errors occur"
  actions_enabled     = true
  alarm_actions       = [aws_sns_topic.alert_topic.arn]
}

# Create an SNS topic for alerting developers about unexpected errors
resource "aws_sns_topic" "alert_topic" {
  name = "${local.name_prefix}-error-alert-topic"
}

# Create email subscriptions for the SNS alert topic
resource "aws_sns_topic_subscription" "email_subscription" {
  for_each = toset(var.DEV_EMAILS)

  topic_arn = aws_sns_topic.alert_topic.arn
  protocol  = "email"
  endpoint  = each.value
}


