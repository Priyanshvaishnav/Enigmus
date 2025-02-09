resource "tls_private_key" "my_key" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "aws_key_pair" "deployer_key" {
  key_name   = "my-keypair"
  public_key = tls_private_key.my_key.public_key_openssh
}

resource "local_file" "private_key" {
  filename = "${path.module}/my-keypair.pem"
  content  = tls_private_key.my_key.private_key_pem
}
