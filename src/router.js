const { Router } = require("express");
const appController = require("./controllers/appController");
const {
  messagesRouter,
  profileRouter,
  searchRouter,
  registerRouter,
  loginRouter,
} = require("./routes/index");
const { prismaClient } = require("./database");

const router = new Router();

// router.use(async (req, res, next) => {
//   // TODO: temporary solution (avoids login)
//   req.session.user_obj = await prismaClient.user.findFirst({
//     include: { receivedMessages: true, languages: true },
//   });

//   res.locals.user = req.session.user_obj;

//   next();
// });

router.get("/", appController.index);

router.use(messagesRouter);
router.use(profileRouter);
router.use(searchRouter);
router.use(registerRouter);
router.use(loginRouter);

module.exports = router;
