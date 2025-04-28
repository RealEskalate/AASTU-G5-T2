class Urls {
  static const String baseUrl =
      'https://aastu-g5-t2.onrender.com';
  static String getgroupbyid(int id) => '$baseUrl/groups/$id';
  static String getgroups() => '$baseUrl/groups/';
  static String getcontests() => '$baseUrl/codeforces/contests';
  static  String getcontestbyid(int id) => '$baseUrl/codeforces/contests/$id';


}
