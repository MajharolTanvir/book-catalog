import { router } from '../../../shared/sharedRouter';
import { UserController } from './user.controller';

router.post('/signup', UserController.createUser);

router.get('/', UserController.allUser);
router.get('/:id', UserController.singleUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export const UserRouter = router;
