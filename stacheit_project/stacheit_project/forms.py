from django import forms
from django.contrib.auth.models import User
from authentication.models import Stacher

class StacheUserCreationForm(forms.ModelForm):
    """
    Stache It user creation form, based off of Django's UserCreationForm.
    Fields include Username, First name, Last name, Email, Password, and Password
    Confirmation. Uses placeholders in widgets, with empty labels.
    """
    error_messages = {
        'duplicate_username': ("A user with that username already exists."),
        'password_mismatch': ("The two password fields did not match."),
    }
    username = forms.RegexField(label= (""), max_length=30,
        regex=r'^[\w.@+-]+$',
        help_text= ("Required. 30 characters or fewer. Letters, digits and "
                    "@/./+/-/_ only."),
        error_messages={
            'invalid':  ("This value may contain only letters, numbers and "
                         "@/./+/-/_ characters.")},
	widget = forms.TextInput(attrs={'placeholder': 'Username'}))
    password1 = forms.CharField(label=(""),
        widget= forms.PasswordInput(attrs={'placeholder': 'Password'}) )
    password2 = forms.CharField(label=(""),
        widget= forms.PasswordInput(attrs={'placeholder': 'Confirm password'}),
        help_text=("Enter the same password as above, for verification."))
    first_name = forms.CharField(label= (""), widget = forms.TextInput(attrs={'placeholder': 'First name'}), max_length=30)
    last_name = forms.CharField(label= (""), widget = forms.TextInput(attrs={'placeholder': 'Last name'}), max_length=30)
    email = forms.EmailField(label= (""), widget = forms.TextInput(attrs={'placeholder': 'Email'}), max_length=75)
    class Meta:
        model = User
        fields = ("username", "first_name", "last_name", "email",)

    def clean_username(self):
        # Since User.username is unique, this check is redundant,
        # but it sets a nicer error message than the ORM. See #13147.
        username = self.cleaned_data["username"]
        try:
            User._default_manager.get(username=username)
        except User.DoesNotExist:
            return username
        raise forms.ValidationError(
            self.error_messages['duplicate_username'],
            code='duplicate_username',
        )

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError(
                self.error_messages['password_mismatch'],
                code='password_mismatch',
            )
        return password2

    def save(self, commit=True): 
        user = super(StacheUserCreationForm, self).save(commit=False)
        user.first_name = self.cleaned_data["first_name"]
        user.last_name = self.cleaned_data["last_name"]
        user.email = self.cleaned_data["email"]
        user.set_password(self.cleaned_data["password2"])

        if commit:
            user.save()
            stacher = Stacher(user= user, display_name=user.first_name, email=user.email)
            stacher.save()
        return user



