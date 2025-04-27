import 'dart:convert';

import 'package:a2svhub/core/constants/constants.dart';
import 'package:a2svhub/core/error/exceptions.dart';
import 'package:a2svhub/features/contests/data/model/contestmodel.dart';
import 'package:a2svhub/features/groups/data/models/group_model.dart';
import 'package:http/http.dart' as http;

abstract class ContestRemoteDataSource {
  Future<ContestModel> getContest(int id);
  Future<List<ContestModel>> getContests();
}

class ContestRemoteDataSourceImpl extends ContestRemoteDataSource {
  static const String _token =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVua3V0YXRhc2guZXNoZXR1QGEyc3Yub3JnIiwiZXhwIjoxNzc1ODUwMzY3LCJyb2xlIjoic3VwZXJfYWRtaW4iLCJ0b2tlblR5cGUiOiJyZWZyZXNoX3Rva2VuIn0.RTJLatFRFyFlk2wauV6hsiz_q_-aD6vMhZ-bGfNzk4g'
      ;
  final http.Client client;
  Map<String, String> _headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer $_token',
};
  ContestRemoteDataSourceImpl({required this.client});

  Future<ContestModel> getContest(int id) async {
    final response = await client.get(Uri.parse(Urls.getcontestbyid(id), 
    ),headers: _headers,);
    if (response.statusCode == 200) {
      return ContestModel.fromJson(json.decode(response.body));
    } else {
      throw ServerException('failed');
    }
  }

  Future<List<ContestModel>> getContests() async {
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
