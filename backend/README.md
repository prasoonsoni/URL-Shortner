# Backend for URL Shortner 🗄️ 🔧

## For Developers

### 🔗 Base URL - <a href='https://url.prasoon.codes' target='_blank'>``` https://url.prasoon.codes```</a>

### 🌐 Endpoints 

### ```POST /short```
#### Body
```json
{
    "url":"your-long-url-here",
    "back_half":"this-is-optional"
}
```

### ```GET /shortid```
#### ```shortid``` ```=``` ```9-character-unique-id``` <i>```or```</i> ```9-character-unique-back-half```
