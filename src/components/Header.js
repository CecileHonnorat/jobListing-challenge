
export default function Header() {

    let headerImg;
    let windowSize = window.screen.width
    console.log(windowSize)
    let  headerImgDesktop = <img src='../images/bg-header-desktop.svg' alt="background" style={{ width:'100vw', backgroundColor: 'hsl(180, 29%, 50%)' }} />
    let  headerImgMobile = <img src='../images/bg-header-mobile.svg' alt="background" style={{ width:'100vw', backgroundColor: 'hsl(180, 29%, 50%)', backgroundSize:'cover' }} />

    windowSize < 500 ?  headerImg = headerImgMobile : headerImg = headerImgDesktop
    

    return (
        <div>
            {headerImg}
        </div>
    )
}