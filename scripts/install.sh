#!/bin/bash


echo "Updating package list..."
sudo apt update -y


echo "Installing Java..."
sudo apt install -y openjdk-17-jdk


java -version


echo "Installing Jenkins..."
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null


sudo apt update -y
sudo apt install -y jenkins


sudo systemctl start jenkins
sudo systemctl enable jenkins


echo "Installing Docker..."
sudo apt install -y docker.io


sudo systemctl start docker
sudo systemctl enable docker


sudo usermod -aG docker $USER


echo "Installation completed!"
echo "Jenkins is running at http://$(hostname -I | awk '{print $1}'):8080"
echo "To get Jenkins initial password, run: sudo cat /var/lib/jenkins/secrets/initialAdminPassword"
echo "Logout and log back in for Docker group changes to take effect."
