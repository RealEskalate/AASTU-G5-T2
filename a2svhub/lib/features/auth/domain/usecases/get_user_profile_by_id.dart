import '../repositories/auth_repository.dart';
import '../entities/user_entity.dart';

class GetUserProfileByIdParams {
  final int id;

  GetUserProfileByIdParams({required this.id});
}

class GetUserProfileById {
  final AuthRepository repository;

  GetUserProfileById(this.repository);

  Future<UserEntity> call(GetUserProfileByIdParams params) async {
    return await repository.getUserProfileById(params.id);
  }
}