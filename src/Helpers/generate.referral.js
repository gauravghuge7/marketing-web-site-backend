
function createReferral() {
    
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    let referral = "";
    for (let i = 0; i < 15; i++) {
        referral += str.charAt(Math.floor(Math.random() * str.length));
    }
    console.log(referral);

    return referral;
}


// generateRefferal();

export default createReferral;