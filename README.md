# http-listener

Small HTTP server for running a specified shell command upon request. Done for u/stamas on Reddit for the post https://www.reddit.com/r/npm/comments/apri9v/js_library_to_run_shell_command_on_http_request/.

## Instructions

Clone the repo and install deps

    git clone https://github.com/jantuomi/http-listener
    cd http-listener
    npm i

Install the command line tool globally

    npm i -g .

Run anywhere

    http-listener -p 8080 --method GET --path /a/b --exec "echo 'request received!'"
