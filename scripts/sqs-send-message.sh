aws sqs send-message \
    --queue-url https://XXX.fifo \
    --message-group-id react \
    --message-body 'source_code_status' \
    --message-attributes '{"owner": {"DataType": "String", "StringValue": "facebook"}, "repo": {"DataType": "String", "StringValue": "react"}, "status": {"DataType": "String", "StringValue": "completed"}}' \
    --region ap-southeast-1