docker build -t nessus8 .

docker run -d --name nessus8 -p 8834:8834 nessus8
