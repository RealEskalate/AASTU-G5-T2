import 'dart:convert';

import 'package:a2svhub/core/constants/constants.dart';
import 'package:a2svhub/core/error/exceptions.dart';
import 'package:a2svhub/features/contests/data/model/contestmodel.dart';
import 'package:a2svhub/features/groups/data/models/group_model.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

abstract class ContestRemoteDataSource {
  Future<ContestModel> getContest(int id);
  Future<List<ContestModel>> getContests();
}

class ContestRemoteDataSourceImpl extends ContestRemoteDataSource {
 
  final http.Client client;
  Future<String> _getAccessToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('accessToken') ?? ''; // Return empty string if not found
  }
 
  ContestRemoteDataSourceImpl({required this.client});

  Future<ContestModel> getContest(int id) async {
     final accessToken = await _getAccessToken();

    if (accessToken.isEmpty) {
      throw ServerException('Access token is missing');
    }
    final Map<String, String> _headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $accessToken',
    };
    final response = await client.get(Uri.parse(Urls.getcontestbyid(id), 
    ),headers: _headers,);
    if (response.statusCode == 200) {
      return ContestModel.fromJson(json.decode(response.body));
    } else {
      throw ServerException('failed');
    }
  }

  Future<List<ContestModel>> getContests() async {
     final accessToken = await _getAccessToken();

    if (accessToken.isEmpty) {
      throw ServerException('Access token is missing');
    }

    // Set the Authorization header with the retrieved access token
    final Map<String, String> _headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $accessToken',
    };
    try {
      final response = await client.get(Uri.parse(Urls.getcontests()), headers: _headers);

      if (response.statusCode == 200) {
      final List<dynamic> jsonList = json.decode(response.body);

      final List<ContestModel> contests =
          jsonList.map((jsonItem) => ContestModel.fromJson(jsonItem)).toList();

      return contests;
    } else {
        throw ServerException(
            'Failed to load contests: ${response.reasonPhrase}');
      }
    } catch (e) {
      throw ServerException('An error occurred: $e');
    }
  }
}
