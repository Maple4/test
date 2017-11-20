// import {loading} from './loading'

const ajax=(config)=>{
    const xhr=new XMLHttpRequest()
    // loading.show()
    xhr.open(config.method,config.url,true)
    if(config.method==='post'||config.method==='put'){
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    }
    xhr.send(config.params)
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===4 && xhr.status===200){
            config.callback(JSON.parse(xhr.responseText))
            // loading.hide()
        }
    }
}

export default ajax