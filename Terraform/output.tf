output "master_instance_public_ip" {
  value = aws_instance.master.public_ip
}

output "slave_instance_public_ip" {
  value = aws_instance.slave.public_ip
}

output "key_pair_name" {
  value = aws_key_pair.deployer_key.key_name
}
