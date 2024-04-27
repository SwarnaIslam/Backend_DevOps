sudo docker compose down

aws ecr get-login-password --region us-west-2 | sudo docker login --username AWS --password-stdin 529587691442.dkr.ecr.us-west-2.amazonaws.com

sudo docker pull 529587691442.dkr.ecr.us-west-2.amazonaws.com/ctd

sudo docker compose up -d