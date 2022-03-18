// https://www.shangmayuan.com/a/052b649e2f6a480c861c97f7.html
// 过滤器
let filterUnauthorized = (req, res, next) => {
    if (!req.verifiedUser) {
        res.status(401)
        next("Unauthorized")
    }
    next()
}

let filterUnauthForCourse = (req, res, next) => {
    const url = req.url
    console.log("URL: ", url, "Classname: ", req.classname)
    if (!req.verifiedUser.accessModules.includes(url)) {
        res.status(403)
        next("Unauthenticated: 你还没买课")
    }
    next()
}

module.exports = {
    filterUnauthorized,
    filterUnauthForCourse
}