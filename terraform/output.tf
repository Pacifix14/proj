output "cloudflare_record" {
  value       = cloudflare_record.app.name
  description = "The DNS record created in Cloudflare for the hosted site."
}

output "cloudflare_hosted_link" {
  value       = "https://${local.cloudflare_subdomain}.${local.cloudflare_domain}"
  description = "The URL for the hosted site on Cloudflare."
  sensitive   = true
}
