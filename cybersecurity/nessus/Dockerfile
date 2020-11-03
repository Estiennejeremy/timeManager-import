FROM debian:9

ADD Nessus-8.12.1-debian6_amd64.deb /tmp/Nessus-8.1.2-debian6_amd64.deb

RUN apt-get update -y \
&& apt-get install -y apt-utils tzdata \
&& dpkg -i /tmp/Nessus-8.1.2-debian6_amd64.deb \
&& rm -r /tmp/Nessus-8.1.2-debian6_amd64.deb

EXPOSE 8834

CMD service nessusd start && tail -f /dev/null
