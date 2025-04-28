import '../entities/user_entity.dart';
import 'dart:io';

abstract class AuthRepository {
  Future<Map<String, dynamic>> login(String email, String password);
  Future<String> updateProfile({required Map<String, dynamic> fields, File? photo});
  Future<UserEntity> getMyProfile();
  Future<UserEntity> getUserProfileById(int id);
}
