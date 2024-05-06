import SvgIcon from "./SvgIcon/index.vue"

const GloComponents = {SvgIcon}

export default {
    install(app : any){
        for(const [key, value] of Object.entries(GloComponents) ){
            app.component(key, value)
        }
    }
}