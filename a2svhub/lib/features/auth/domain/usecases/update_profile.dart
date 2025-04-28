import 'dart:io';
import '../repositories/auth_repository.dart';

class UpdateProfileParams {
  final Map<String, dynamic> fields; // Dynamic fields for form data
  final File? photo; // Optional photo file

  UpdateProfileParams({required this.fields, this.photo});
}

class UpdateProfile {
  final AuthRepository repository;

  UpdateProfile(this.repository);

  Future<String> call(UpdateProfileParams params) async {
    return await repository.updateProfile(fields: params.fields, photo: params.photo);
  }
}