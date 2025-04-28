import 'package:equatable/equatable.dart';

abstract class ContestEvent extends Equatable {
  const ContestEvent();

  @override
  List<Object> get props => [];
}

class LoadContestsEvent extends ContestEvent {}
