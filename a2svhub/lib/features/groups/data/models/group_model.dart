import 'package:a2svhub/features/groups/data/models/headmodel.dart';
import 'package:a2svhub/features/groups/data/models/student_model.dart';
import 'package:a2svhub/features/groups/domain/entities/group_entity.dart';
import 'package:a2svhub/features/groups/domain/entities/head_entity.dart';
import 'package:a2svhub/features/groups/domain/entities/student_entity.dart';

class GroupModel extends GroupEntity {
  GroupModel({
    required int id,
    required String name,
    required String shortName,
    required String description,
    required String country,
    int? hoaId,
    String? hoaName,
    List<StudentEntity> students = const [],
    List<HeadEntity> heads = const [],
  }) : super(
          id: id,
          name: name,
          shortName: shortName,
          description: description,
          country: country,
          hoaId: hoaId,
          hoaName: hoaName,
          students: students,
          heads: heads,
        );

  /// Factory: from JSON
  factory GroupModel.fromJson(Map<String, dynamic> json) {
    return GroupModel(
      id: json['id'],
      name: json['name'],
      shortName: json['short_name'],
      description: json['description'],
      country: json['country'],
      hoaId: json['hoa_id'],
      hoaName: json['hoa_name'],
      students: (json['students_list'] ?? [])
          .map<StudentEntity>((s) => StudentModel.fromJson(s))
          .toList(),
      heads: (json['heads_list'] ?? [])
          .map<HeadEntity>((h) => HeadModel.fromJson(h))
          .toList(),
    );
  }

  /// Convert to JSON
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'short_name': shortName,
      'description': description,
      'country': country,
      'hoa_id': hoaId,
      'hoa_name': hoaName,
      'students_list': students.map((s) => (s as StudentModel).toJson()).toList(),
      'heads_list': heads.map((h) => (h as HeadModel).toJson()).toList(),
    };
  }

  /// Convert from Entity
  factory GroupModel.fromEntity(GroupEntity entity) {
    return GroupModel(
      id: entity.id,
      name: entity.name,
      shortName: entity.shortName,
      description: entity.description,
      country: entity.country,
      hoaId: entity.hoaId,
      hoaName: entity.hoaName,
      students: entity.students.map((s) => StudentModel.fromEntity(s)).toList(),
      heads: entity.heads.map((h) => HeadModel.fromEntity(h)).toList(),
    );
  }

  /// Convert to Entity
  GroupEntity toEntity() {
    return GroupEntity(
      id: id,
      name: name,
      shortName: shortName,
      description: description,
      country: country,
      hoaId: hoaId,
      hoaName: hoaName,
      students: students,
      heads: heads,
    );
  }
}
