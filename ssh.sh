ssh -R 5554:localhost:5554 -R 5555:localhost:5555 -R 5037:localhost:5037 -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ./.vagrant/machines/default/virtualbox/private_key -l vagrant -p 2963 localhost