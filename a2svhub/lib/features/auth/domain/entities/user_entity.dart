class UserEntity {
  final int id;
  final String name;
  final String email;
  final String? photo;
  final String? university;
  final String? role;
  final String? country;
  final String? joinedDate;
  final String? expectedGraduationDate;
  final String? shortBio;
  final String? leetcode;
  final String? codeforces;
  final String? github;
  final String? instagram;
  final String? phone;
  final String? studentId;
  final String? telegramUsername;
  final String? group;
  final String? department;

  UserEntity({
    required this.id,
    required this.name,
    required this.email,
    this.photo,
    this.university,
    this.role,
    this.country,
    this.joinedDate,
    this.expectedGraduationDate,
    this.shortBio,
    this.leetcode,
    this.codeforces,
    this.github,
    this.instagram,
    this.phone,
    this.studentId,
    this.telegramUsername,
    this.group,
    this.department,
  });
}
