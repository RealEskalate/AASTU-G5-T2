import 'dart:convert';
import 'dart:io';
import 'package:a2svhub/features/auth/data/model/user_model.dart';
import 'package:http/http.dart' as http;


abstract class AuthRemoteDataSource {
  Future<Map<String, dynamic>> login(String email, String password);
  Future<String> updateProfile({required Map<String, dynamic> fields, File? photo});
  Future<UserModel> getMyProfile();
  Future<UserModel> getUserProfileById(int id);
}
