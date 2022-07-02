import { defineComponent } from "vue";
import HeaderNav from "@/components/nav/nav";
import { userEditor } from "@/hooks/use_editor";
import { Viewer } from "@bytemd/vue-next";
import './details.less'
export default defineComponent({
    name: "details",
    components: {
        Viewer
    },
    setup(){
        
        const { editorConfig,zh_Hans } = userEditor()
        editorConfig.value = `## dsadas 
       
        dsadad.  dasdyarn add aaaa
        
        | 标题 |  |
        | --- | --- |
        | 000 | 0000 |
        
        ddddsadasd
       
        uggybububbbbbbbbbbbbbhhhh
        jkkjbsadasdasdasdasdas dsad s dsa da d `
        return () => (
            <div class="details">      
                <HeaderNav/>
               <div class="details-main">
                    <div class="details-main-content">
                        <div class="details-main-content-header">
                            <h1></h1>
                            <div class="details-main-content-header-user">
                                <div class="user-image">
                                    <img src="https://p6-passport.byteacctimg.com/img/user-avatar/e4e77b17f384d5c51b9138ee9bb0581c~300x300.image" alt="" />
                                </div>
                                <div class="user-info">
                                    <a href="">
                                        <span>
                                            追_光_者
                                        </span>
                                    </a>
                                    <div class="user-info-meta">
                                        <span>2022年06月27日 20:34</span>
                                        <span> ·&nbsp;&nbsp;阅读943</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <viewer
                          value={ editorConfig.value }
                          tabindex="2"
                          sanitize="23"
                          plugins={editorConfig.plugins}
                          locale={zh_Hans}
                        />
                    </div>
                    <div class="details-main-sider">

                    </div>
               </div>
            </div>
        )
    }
})