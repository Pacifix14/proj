# resource "aws_s3_bucket" "bucket" {
#   bucket = var.AWS_S3_BUCKET_NAME
# }

# resource "aws_s3_bucket_ownership_controls" "bucket_ownership" {
#   bucket = aws_s3_bucket.bucket.id
#   rule {
#     object_ownership = "BucketOwnerEnforced"
#   }
# }

# resource "aws_s3_bucket_public_access_block" "bucket_public_access" {
#   bucket = aws_s3_bucket.bucket.id

#   block_public_acls       = true
#   block_public_policy     = false
#   ignore_public_acls      = true
#   restrict_public_buckets = false
# }

# resource "aws_s3_bucket_versioning" "bucket_versioning" {
#   bucket = aws_s3_bucket.bucket.id
#   versioning_configuration {
#     status = "Enabled"
#   }
# }

# resource "aws_s3_bucket_policy" "bucket" {
#   bucket = aws_s3_bucket.bucket.id

#   policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Sid    = "AllowECSTaskUpload"
#         Effect = "Allow"
#         Principal = {
#           AWS = aws_iam_role.ecs_task_role.arn
#         }
#         Action = [
#           "s3:PutObject",
#           "s3:GetObject",
#           "s3:DeleteObject"
#         ]
#         Resource = [
#           "${aws_s3_bucket.bucket.arn}/*"
#         ]
#       },
#       {
#         Sid       = "PublicRead"
#         Effect    = "Allow"
#         Principal = "*"
#         Action = [
#           "s3:GetObject"
#         ]
#         Resource = [
#           "${aws_s3_bucket.bucket.arn}/*"
#         ]
#       }
#     ]
#   })
# }

# # Enable CORS for the bucket
# resource "aws_s3_bucket_cors_configuration" "bucket" {
#   bucket = aws_s3_bucket.bucket.id

#   cors_rule {
#     allowed_headers = [
#       "*",
#       "Authorization",
#       "Content-Length",
#       "Content-Type",
#       "x-amz-date",
#       "x-amz-content-sha256",
#       "x-amz-user-agent"
#     ]
#     allowed_methods = ["GET", "PUT", "POST"]
#     allowed_origins = [
#       "https://${local.cloudflare_subdomain}.${local.cloudflare_domain}",
#       "https://*.${local.cloudflare_domain}",
#       "http://localhost:3000"
#     ]
#     expose_headers  = ["ETag"]
#     max_age_seconds = 3000 # Increased to 24 hours (from 3000 seconds)
#   }
# }
