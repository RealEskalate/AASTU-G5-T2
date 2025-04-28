import 'dart:convert';

import 'package:a2svhub/core/constants/constants.dart';
import 'package:a2svhub/core/error/exceptions.dart';
import 'package:a2svhub/features/groups/data/models/group_model.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

abstract class GroupRemoteDataSource {
  Future<GroupModel> getGroup(int id);
  Future<List<GroupModel>> getGroups();
}

class GroupRemoteDataSourceImpl extends GroupRemoteDataSource {
 
  final http.Client client;
  
  GroupRemoteDataSourceImpl({required this.client});
   Future<String> _getAccessToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('accessToken') ?? ''; // Return empty string if not found
  }

  Future<GroupModel> getGroup(int id) async {
    final accessToken = await _getAccessToken();
     final Map<String, String> _headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $accessToken',
    };
    final response = await client.get(
      Uri.parse(Urls.getgroupbyid(id)),
      headers: _headers,
    );
    if (response.statusCode == 200) {
      return GroupModel.fromJson(json.decode(response.body));
    } else {
      throw ServerException('failed');
    }
  }

  Future<List<GroupModel>> getGroups() async {
    final accessToken = await _getAccessToken();
     final Map<String, String> _headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $accessToken',
    };
    try {
      final response = await client.get(Uri.parse(Urls.getgroups()), headers: _headers);

      if (response.statusCode == 200) {
      final List<dynamic> jsonList = json.decode(response.body);

      final List<GroupModel> groups =
          jsonList.map((jsonItem) => GroupModel.fromJson(jsonItem)).toList();

      return groups;
    } else {
        throw ServerException(
            'Failed to load products: ${response.reasonPhrase}');
      }
    } catch (e) {
      throw ServerException('An error occurred: $e');
    }
  }
}
