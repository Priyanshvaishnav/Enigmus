resource "aws_instance" "master" {
  ami             = "ami-0cb91c7de36eed2cb" 
  instance_type   = "t2.micro"
  availability_zone = "us-east-2a"
  key_name        = aws_key_pair.deployer_key.key_name
  security_groups = [aws_security_group.instance_sg.name]

  tags = {
    Name = "MasterNode"
  }
}

resource "aws_instance" "slave" {
  ami             = "ami-0cb91c7de36eed2cb"
  instance_type   = "t2.medium"
  availability_zone = "us-east-2b"
  key_name        = aws_key_pair.deployer_key.key_name
  security_groups = [aws_security_group.instance_sg.name]

  tags = {
    Name = "SlaveNode"
  }
}
