import { Fragment } from "react";
import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon
  } from "react-share"
  import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
  } from "react-share";
 function Sharing(props){
    return(
        <Fragment>
          
          <div className="row g-4">
            <div className="col-auto">
            <FacebookShareButton url={props.shareurl}>
        <FacebookIcon round={true}/>
      </FacebookShareButton>
            </div>
            <div className="col-auto">
            <TwitterShareButton url={props.shareurl} title={props.title}>
        <TwitterIcon round={true}/>
      </TwitterShareButton>
            </div>
            <div className="col-auto">
            <LinkedinShareButton url={props.shareurl} title={props.title}>
        <LinkedinIcon round={true}/>
      </LinkedinShareButton>
            </div>
            <div className="col-auto">
            <WhatsappShareButton url={props.shareurl}>
        <WhatsappIcon round={true}/>
      </WhatsappShareButton>
            </div>
            <div className="col-auto">
            <PinterestShareButton url={props.shareurl} media={`${props.shareurl}/image.jpg`} description={props.title}>
        <PinterestIcon round={true}/>
      </PinterestShareButton>
            </div>
            <div className="col-auto">
            <EmailShareButton url={props.shareurl} subject={props.title} body="Check this out!">
        <EmailIcon round={true}/>
      </EmailShareButton> 
            </div>
          </div>
          <div className="container-fluid mt-5 d-flex justify-content-center">
            <div className="row align-items-center p-2 rounded-4 bg-gray4">
            <div className="col-10 text-center  ">
              {props.shareurl}
            </div>
            <div className="col-2">
              <button className="btn text-blue1 pe-2" onClick={()=>( navigator.clipboard.writeText (props.shareurl))}>copy</button>
            </div>
            </div>
        
          </div>
        </Fragment>
    )
}
export default Sharing