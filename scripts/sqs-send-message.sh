aws sqs send-message \
    --queue-url https://sqs.ap-southeast-1.amazonaws.com/596194804541/sam-app-StopCrawlerQueue-a8ZXMk620MMk.fifo \
    --message-group-id react \
    --message-body 'source_code_status' \
    --message-attributes '{"owner": {"DataType": "String", "StringValue": "facebook"}, "repo": {"DataType": "String", "StringValue": "react"}, "status": {"DataType": "String", "StringValue": "completed"}}' \
    --region ap-southeast-1