Simple scan
nmap -T4 IP

Scan all the ports
nmap -T4 -p- IP

Scan only the top port
nmap -T4 --top-ports IP

Service and version detection
nmap -T4 -A IP

OS Detection
nmap -O --osscan-guess IP
