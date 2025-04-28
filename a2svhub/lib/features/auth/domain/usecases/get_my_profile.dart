import '../repositories/auth_repository.dart';
import '../entities/user_entity.dart';

class GetMyProfile {
  final AuthRepository repository;

  GetMyProfile(this.repository);

  Future<UserEntity> call() async {
    return await repository.getMyProfile();
  }
}