const { Router } = require("express");
const appController = require("./controllers/appController");
const {
  messagesRouter,
  profileRouter,
  searchRouter,
  registerRouter,
  loginRouter,
} = require("./routes/index");
const dayjs = require("dayjs");
dayjs.extend(require("dayjs/plugin/relativeTime"));

const router = new Router();

router.use((req, res, next) => {
  if (!req.session.user_obj) {
    return next();
  }
  const user = req.session.user_obj;
  res.locals.user = {
    ...user,
    age: dayjs().diff(user.birthdate, "year"),
  };

  next();
});

router.get("/", appController.index);

router.use(messagesRouter);
router.use(profileRouter);
router.use(searchRouter);
router.use(registerRouter);
router.use(loginRouter);

module.exports = router;
