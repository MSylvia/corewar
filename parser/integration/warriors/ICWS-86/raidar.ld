;redcode-86
;name Nameless
;author Blameless
ORG	3
DAT.F	#0,	#0
DAT.F	#0,	#0
DAT.F	#0,	#0
MOV.AB	#33,	$-1
MOV.AB	#-163,	$-4
MOV.AB	#223,	$-4
MOV.AB	#42,	<-6
MOV.AB	#42,	<-6
DJN.B	$-2,	$-6
MOV.AB	#-163,	$-9
MOV.AB	#223,	$-9
MOV.AB	#33,	$-9
CMP.AB	#42,	<-12
JMP.B	$5,	$0
CMP.AB	#42,	<-13
JMP.B	$8,	$0
DJN.B	$-4,	$-14
JMP.B	$-8,	$0
MOV.AB	#25,	$-16
MOV.AB	#-400,	$-19
MOV.I	@-18,	<-20
DJN.B	$-1,	$-19
JMP.B	@-22,	$0
MOV.AB	#25,	$-21
MOV.AB	#425,	$-24
MOV.I	@-23,	<-25
DJN.B	$-6,	$-24
JMP.B	@-27,	$0
