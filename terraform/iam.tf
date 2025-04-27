data "aws_iam_policy_document" "ecs_agent" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs_agent" {
  name               = "${aws_ecs_cluster.ecs_cluster.name}-ecs-agent"
  assume_role_policy = data.aws_iam_policy_document.ecs_agent.json
}

# Attach the ECS agent policy to the role
resource "aws_iam_role_policy_attachment" "ecs_agent" {
  role       = aws_iam_role.ecs_agent.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

# Attach additional policies for EC2 instance launch and Auto Scaling
resource "aws_iam_role_policy_attachment" "ec2_full_access" {
  role       = aws_iam_role.ecs_agent.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2FullAccess"
}

resource "aws_iam_role_policy_attachment" "autoscaling_full_access" {
  role       = aws_iam_role.ecs_agent.name
  policy_arn = "arn:aws:iam::aws:policy/AutoScalingFullAccess"
}

# Create an instance profile for ECS agents
resource "aws_iam_instance_profile" "ecs_agent" {
  name = "${aws_ecs_cluster.ecs_cluster.name}-ecs-agent"
  role = aws_iam_role.ecs_agent.name
}

# ECS Task Execution Role
data "aws_iam_policy_document" "ecs_task_execution_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

# Create the ecsTaskExecutionRole as recommended by AWS
resource "aws_iam_role" "ecs_task_execution_role" {
  name               = local.ecs_task_execution_role_name
  assume_role_policy = data.aws_iam_policy_document.ecs_task_execution_role.json

  # Force the role to be created before it's destroyed during updates
  lifecycle {
    create_before_destroy = true
  }
}

# Attach the AWS-managed ECS Task Execution Role Policy
resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Additional CloudWatch Logs permissions
resource "aws_iam_role_policy" "ecs_task_execution_cloudwatch" {
  name = "${local.name_prefix}-ecs-cloudwatch-policy"
  role = aws_iam_role.ecs_task_execution_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "logs:DescribeLogStreams",
          "logs:DescribeLogGroups"
        ]
        Resource = [
          "arn:aws:logs:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:log-group:*",
          "arn:aws:logs:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:log-group:*:*"
        ]
      }
    ]
  })
}

# ECS Task Role
data "aws_iam_policy_document" "ecs_task_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs_task_role" {
  name               = "${local.name_prefix}-ecs-task-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_role.json
}

# S3 policy for the task role with expanded permissions
# resource "aws_iam_role_policy" "ecs_task_s3" {
#   name = "${local.name_prefix}-ecs-s3-policy"
#   role = aws_iam_role.ecs_task_role.id

#   policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Effect = "Allow"
#         Action = [
#           "s3:PutObject",
#           "s3:GetObject",
#           "s3:DeleteObject"
#         ]
#         Resource = [
#           "${aws_s3_bucket.bucket.arn}",
#           "${aws_s3_bucket.bucket.arn}/*"
#         ]
#       },
#       {
#         Effect = "Allow"
#         Action = [
#           "s3:ListAllMyBuckets",
#           "s3:GetBucketLocation"
#         ]
#         Resource = "*" # Needed for bucket operations
#       }
#     ]
#   })
# }
