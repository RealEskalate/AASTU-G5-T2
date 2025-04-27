import 'dart:convert';
import 'dart:io';
import 'package:a2svhub/features/auth/data/model/user_model.dart';
import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart';
// import 'package:hub/core/constants.dart';

import 'package:shared_preferences/shared_preferences.dart';
import 'auth_remote_datasource.dart';

class AuthRemoteDataSourceImpl implements AuthRemoteDataSource {
  final http.Client client;
  final BASE_URL = 'https://aastu-g5-t2.onrender.com';
  String accessToken = ''; // You'll update this when you log in and store it securely
  AuthRemoteDataSourceImpl({required this.client});

Future<Map<String, dynamic>> login(String email, String password) async {
  final response = await http.post(
    Uri.parse('https://aastu-g5-t2.onrender.com/auth/login'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({
      "email": email,
      "password": password,
    }),
  );

  if (response.statusCode == 200) {
    final responseBody = jsonDecode(response.body);
    final accessToken = responseBody['access_token'];
    final refreshToken = responseBody['refresh_token'];

    // Store the new tokens using SharedPreferences
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('accessToken', accessToken);
    await prefs.setString('refreshToken', refreshToken);

    return responseBody;
  } else {
    throw Exception('Failed to login: ${response.body}');
  }
}
Future<String> updateProfile({required Map<String, dynamic> fields, File? photo}) async {
  // Retrieve the token from SharedPreferences
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('accessToken');
  if (token == null || token.isEmpty) {
    throw Exception('Access token is missing. Please log in again.');
  }

  final uri = Uri.parse('https://aastu-g5-t2.onrender.com/auth/myprofile');
  final request = http.MultipartRequest('PUT', uri);

  // Add authorization header
  request.headers['Authorization'] = 'Bearer $token';

  // Add form data fields dynamically
  fields.forEach((key, value) {
    if (value != null && value.toString().isNotEmpty) {
      request.fields[key] = value.toString();
    }
  });

  // Add photo file if provided
  if (photo != null) {
    request.files.add(await http.MultipartFile.fromPath(
      'photo',
      photo.path,
      contentType: MediaType('image', 'png'),
    ));
  }

  // Send the request
  final streamed = await request.send();
  final response = await http.Response.fromStream(streamed);

  // Handle the response
  if (response.statusCode == 200) {
    final responseBody = jsonDecode(response.body);
    return responseBody['message']; // Return the success message
  } else if (response.statusCode == 401) {
    throw Exception('Invalid token. Please log in again.');
  } else {
    throw Exception('Failed to update profile: ${response.body}');
  }
}
@override
 Future<UserModel> getMyProfile() async {
  // Retrieve the token from SharedPreferences
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('accessToken');
  if (token == null || token.isEmpty) {
    throw Exception('Access token is missing. Please log in again.');
  }

  final uri = Uri.parse('https://aastu-g5-t2.onrender.com/auth/myprofile');
  final response = await http.get(
    uri,
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json',
    },
  );

  if (response.statusCode == 200) {
    final responseBody = jsonDecode(response.body);
    return UserModel.fromJson(responseBody['profile']); // Convert to UserModel
  } else if (response.statusCode == 401) {
    throw Exception('Invalid token. Please log in again.');
  } else {
    throw Exception('Failed to fetch profile: ${response.body}');
  }
}
  @override
  Future<UserModel> getUserProfileById(int id) async {
    final response = await client.get(
      Uri.parse('$BASE_URL/auth/user-profile/$id'),
      headers: {'Authorization': 'Bearer $accessToken'},
    );

    if (response.statusCode == 200) {
      return UserModel.fromJson(jsonDecode(response.body)['profile']);
    } else {
      throw Exception('Failed to fetch user profile by ID');
    }
  }
}
