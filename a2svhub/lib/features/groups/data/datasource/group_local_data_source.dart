
import 'dart:convert';

import 'package:a2svhub/core/error/exceptions.dart';
import 'package:a2svhub/features/groups/data/models/group_model.dart';
import 'package:shared_preferences/shared_preferences.dart';


abstract class GroupLocalDataSource {
  Future<List<GroupModel>> getGroups();
  Future<GroupModel> getGroup(int id);
  
  Future<void> cacheGroup(GroupModel group);
  Future<void>  cacheGroups(List<GroupModel> products);
}

class GroupLocalDataSourceImpl extends GroupLocalDataSource {
  final groupCaheKey = 'Groups';
  final SharedPreferences _sharedPreferences;
  GroupLocalDataSourceImpl({
    required SharedPreferences sharedpreferences,
  }) : _sharedPreferences = sharedpreferences;

  _getProductCachekey(String? id) => '${groupCaheKey}_$id'; 

  @override
  Future<void> cacheGroup(GroupModel group) async {
    await _sharedPreferences.setString(
        _getProductCachekey(group.id.toString()), jsonEncode(group.toJson()));
  }

  @override
  Future<List<GroupModel>> getGroups() async {
    final Groupsjson = _sharedPreferences.getString(groupCaheKey);
    if (Groupsjson != null) {
      return (jsonDecode(Groupsjson) as List)
          .map((e) => GroupModel.fromJson(e))
          .toList();
    } else {
      throw const CacheException("Product list not found");
    }
  }

  @override
  Future<void> cacheGroups(List<GroupModel> products) async {
    await _sharedPreferences.setString(
      groupCaheKey,
      jsonEncode(products.map((e) => e.toJson()).toList()),
    );
  }

  
  @override
  Future<GroupModel> getGroup(int id) async {
    final Groupjson = _sharedPreferences.getString(_getProductCachekey(id.toString()));
    if (Groupjson != null) {
      return GroupModel.fromJson(jsonDecode(Groupjson));
    } else {
      throw const CacheException(
          "could not find product with the given id from cache");
    }
  }
}
