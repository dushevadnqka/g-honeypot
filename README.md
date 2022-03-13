## Hi Paul!

### This is my implementation for the task.

## Install:

1. Prerequisits:
    - docker
    - docker compose
    - curl

2. It's assumed the project is already cloned and reached in your console.

3. Let's first create an `.env` file from the `.env.dist`:
    ```
    cp .env.dist .env
    ```
4. Go to the new `.env` file and take in consideration the ports which would be used and how this would deal with some configs at your host machine.

5. Up the app with `docker-compose`:
    ```
    docker-compose up (-d)
    ```
## Play with the server:
1. To call the endpoint (all get requests):
    ```
    curl http://127.0.0.1:<the NODE_DOCKER_PORT you set in .env - in my case 3000>/<any address you'd like>
    ```
2. Enjoy

3. Monitor the stored data:
    - first connect to the db (I am using the console):
        ```
        docker-compose exec <db service name in your docker-compose.yaml file - db in my case> bash
        ```
    - Login to the MySQL:
        ```
        mysql -u root -p
        ```
    - as a pass use the password stored in your .env file

    - Thes select the db:
        ```
        USE <db name from the .env file in my case: db_name_hp>;
        ```
    - exec a query to see all rows recorded at the moment (the app should be requested already - in terms to see something):
        ```
        SELECT * FROM request;
        ```

## Reset and turn off the app:
1. just `down` it with `docker-compose`:
    ```
    docker-compose down
    ```
2. or if you want additionally to remove even the images:
    ```
    docker-compose down --rmi all
    ```
3. data storage isn't cached as a volume, so every time you start the app the db would be fresh new. 

## Test:
    - Really wanted to add some tests (mostly some e2e tests with Cypress) but the time...

## Some notes during the development of this task:
- The Server:
    - The decision to use Express (Node JS) has been taken based on some research pretty similar to the researches described in this story: https://javascript.plainenglish.io/how-many-requests-can-handle-a-real-world-nodejs-server-side-application-55da7a2f06f3.

For the http - response here was implemented the built in response mechanism of Node JS which is pretty capable and according to the conditions for the task: with Chunked transfer encoding.
- The Persistence layer:
    - The condition was pretty clear:

> What we’d like to do is write a honeypot webservice that accepts all GET requests and replies very slowly with an infinite stream of text (see https://en.wikipedia.org/wiki/Chunked_transfer_encoding), tying up the bot’s resources and slowing it down. Ideally this service will send a new line of text, say, "Not Found" once every 5 seconds. You can see the output from an example running here https://bitter-forest-2999.fly.dev/

But wanted to add this persistent layer based on 2 reasons:
        - The honeypots should get some data from the requests which are reaching it (I took in consideration that probably that might be a legal issue by some legislations, due to some of the data (e.g. ip - address) could be defined as a personal information (GDPR). This data could be good point for some further analysis process in terms to detect suspicious behaviour or possible threats (there are number of solutions which are providing real time analysis based on similar data - VMware Carbon Black, etc...)
        - It's easy to say that the web server is capable to handle large number of rps while you are running only the http server. But what about there is a persistence operations as a store data in DB? This program is processing well with the both and this was a good point to see that. Probably if the requests are pretty much the db persistence could be a bottle neck - yes, sure but first this is Node JS - single thread but equipped with event management engine and then there are good practices for fault-tolerant processing of the persistence use message queue, back-office and listener-workers. How this could be implemented:
        - rabbitMQ
        - one more express (or whatever again single-thread technology) cli app (back-office let's say) where it only expects commands with serialised and "stringified" JSON and after normalisation of the store data - persist it to the DB.
        - background worker - It would be best if this is some technology like Python, again Node JS (probably with supervisor) or Go -lang (capable for long - term running tech, for instance I have tried with PHP and the result wasn't so good due to the specific of this language).
        And that's all: you will do async work to store the data offloading the server.
        * Storing such of data into DB could be really dangerous move also (SQL injection - many criminals are trying to turn the honeypots against it's owners and purposes), that's why this should be implemented at the best manner regarding the rules of escaping and preventing the input before store it to the DB(which is not demonstrated, but has been taken in consideration).
