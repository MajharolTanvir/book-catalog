import { router } from "../../../shared/sharedRouter";
import { UserController } from "./user.controller";

router.post('/signup', UserController.createUser)


export const UserRouter = router