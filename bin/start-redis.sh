# Starts redis based on default location
# Author: Tyler Beck

dir=/c/redis/

cd $dir

./redis-server.exe --maxheap 12000M

read -p "Press [Enter] key..."