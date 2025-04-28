import '../../domain/entities/user_entity.dart';

class UserModel extends UserEntity {
  UserModel({
    required super.id,
    required super.name,
    required super.email,
    super.photo,
    super.university,
    super.role,
    super.country,
    super.joinedDate,
    super.expectedGraduationDate,
    super.shortBio,
    super.leetcode,
    super.codeforces,
    super.github,
    super.instagram,
    super.phone,
    super.studentId,
    super.telegramUsername,
    super.group,
    super.department,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      name: json['name'] ?? '',
      email: json['email'],
      photo: json['photo'],
      university: json['university'],
      role: json['role'],
      country: json['country'],
      joinedDate: json['joined_date'],
      expectedGraduationDate: json['expected_graduation_date'],
      shortBio: json['short_bio'],
      leetcode: json['leetcode'],
      codeforces: json['codeforces'],
      github: json['github'],
      instagram: json['instagram'],
      phone: json['phone'],
      studentId: json['student_id'],
      telegramUsername: json['telegram_username'],
      group: json['group'],
      department: json['department'],
    );
  }

  // ✅ Add this method
  UserEntity toEntity() {
    return UserEntity(
      id: id,
      name: name,
      email: email,
      photo: photo,
      university: university,
      role: role,
      country: country,
      joinedDate: joinedDate,
      expectedGraduationDate: expectedGraduationDate,
      shortBio: shortBio,
      leetcode: leetcode,
      codeforces: codeforces,
      github: github,
      instagram: instagram,
      phone: phone,
      studentId: studentId,
      telegramUsername: telegramUsername,
      group: group,
      department: department,
    );
  }
}
