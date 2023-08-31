import { router } from "../../../shared/sharedRouter";
import { UserController } from "./user.controller";

router.post('/signup', UserController.createUser)

router.get('/', UserController.allUser);



export const UserRouter = router