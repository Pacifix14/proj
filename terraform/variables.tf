
variable "ENVIRONMENT" {
  description = "The environment to deploy resources in."
  type        = string
}

variable "REMOTE_STATE_BUCKET" {
  description = "The bucket to get shared Terraform state file."
  type        = string
}

# variable "AWS_S3_BUCKET_NAME" {
#   description = "The name of the S3 bucket to store the application file."
#   type        = string
# }

variable "AWS_REGION" {
  description = "The AWS region to deploy resources in."
  type        = string
  default     = "ap-southeast-1"
}

variable "DEV_EMAILS" {
  description = "A list of developer email addresses for alert notifications."
  type        = list(string)
  default     = ["lwin.moehtet77@gmail.com", "javierchiaaaa@gmail.com"]
}

variable "ECR_REPO_URI" {
  type      = string
  sensitive = true
}

variable "ECR_IMAGE_DIGEST" {
  type      = string
  sensitive = true
}

variable "CLOUDFLARE_ZONE_ID" {
  type      = string
  sensitive = true
}

variable "CLOUDFLARE_API_TOKEN" {
  description = "API token for managing Cloudflare."
  type        = string
  sensitive   = true
}

variable "CLOUDFLARE_DOMAIN" {
  type      = string
  sensitive = true
  default   = "getout.events"
}

variable "CERTIFICATE_ARN" {
  type      = string
  sensitive = true
}

variable "AUTH_SECRET" {
  type      = string
  sensitive = true
}

variable "AUTH_URL" {
  type      = string
  sensitive = true
}

variable "AUTH_GOOGLE_ID" {
  type      = string
  sensitive = true
}

variable "AUTH_GOOGLE_SECRET" {
  type      = string
  sensitive = true
}

variable "DATABASE_URL" {
  type      = string
  sensitive = true
}

# variable "AWS_ACCESS_KEY_ID" {
#   type      = string
#   sensitive = true
# }

# variable "AWS_SECRET_ACCESS_KEY" {
#   type      = string
#   sensitive = true
# }

# variable "RESEND_API_KEY" {
#   type      = string
#   sensitive = true
# }

# variable "RESEND_DOMAIN" {
#   type      = string
#   sensitive = true
# }
