import 'package:a2svhub/features/groups/domain/entities/head_entity.dart';

class HeadModel extends HeadEntity {
  HeadModel({
    required int id,
    required String name,
    required String email,
    required String photo,
  }) : super(id: id, name: name, email: email, photo: photo);

  /// From JSON
  factory HeadModel.fromJson(Map<String, dynamic> json) {
    return HeadModel(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      photo: json['photo'],
    );
  }

  /// To JSON
  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'email': email,
        'photo': photo,
      };

  /// From Entity
  factory HeadModel.fromEntity(HeadEntity entity) {
    return HeadModel(
      id: entity.id,
      name: entity.name,
      email: entity.email,
      photo: entity.photo,
    );
  }

  /// To Entity
  HeadEntity toEntity() {
    return HeadEntity(
      id: id,
      name: name,
      email: email,
      photo: photo,
    );
  }
}
