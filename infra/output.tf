# outputs the debian ip after terraform apply.
output "ip" {
  value = aws_instance.debian.public_ip
}
