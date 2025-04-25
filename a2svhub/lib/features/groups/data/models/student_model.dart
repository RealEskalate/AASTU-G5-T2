import 'package:a2svhub/features/groups/domain/entities/student_entity.dart';

class StudentModel extends StudentEntity {
  StudentModel({
    required int id,
    required String email,
    required String group,
  }) : super(id: id, email: email, group: group);

  factory StudentModel.fromJson(Map<String, dynamic> json) {
    return StudentModel(
      id: json['id'],
      email: json['email'],
      group: json['group'],
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'email': email,
        'group': group,
      };

  // Converts the StudentModel to StudentEntity
  StudentEntity toEntity() {
    return StudentEntity(
      id: id,
      email: email,
      group: group,
    );
  }

  // Converts StudentEntity to StudentModel
  factory StudentModel.fromEntity(StudentEntity entity) {
    return StudentModel(
      id: entity.id,
      email: entity.email,
      group: entity.group,
    );
  }
}
