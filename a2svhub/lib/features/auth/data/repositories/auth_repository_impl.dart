import 'dart:io';



import 'package:a2svhub/features/auth/data/datasources/auth_remote_datasource.dart';

import '../../domain/entities/user_entity.dart';
import '../../domain/repositories/auth_repository.dart';

class AuthRepositoryImpl implements AuthRepository {
  final AuthRemoteDataSource remoteDataSource;

  AuthRepositoryImpl({required this.remoteDataSource});

  @override
  Future<Map<String, dynamic>> login(String email, String password) {
    return remoteDataSource.login(email, password);
  }

  @override
  Future<String> updateProfile({required Map<String, dynamic> fields, File? photo}) {
    return remoteDataSource.updateProfile(fields: fields, photo: photo);
  }

  @override
  Future<UserEntity> getMyProfile() async {
    final userModel = await remoteDataSource.getMyProfile();
    return userModel.toEntity(); // Convert UserModel to UserEntity
  }

  @override
  Future<UserEntity> getUserProfileById(int id) async {
    final model = await remoteDataSource.getUserProfileById(id);
    return model.toEntity();
  }
}
