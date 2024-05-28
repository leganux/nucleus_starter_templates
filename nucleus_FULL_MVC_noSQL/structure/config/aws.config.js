module.exports ={
    bucket:process.env.BUCKET_AWS,
    acl: "public-read",
    contentDisposition: "inline",// 'attachment',
    serverSideEncryption: false, //'AES256',
    contentEncoding: false,
    region: process.env.AWS_REGION,
    aws_access_key_id: process.env.KEY_ID_AWS,
    aws_secret_access_key: process.env.SECRET_KEY_AWS,
}
