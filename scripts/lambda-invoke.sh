aws lambda invoke --function-name XXX \
    --invocation-type Event \
    --cli-binary-format raw-in-base64-out \
    --payload '{"owner": "vuejs", "repo": "vue", "status": "pending"}' response.json